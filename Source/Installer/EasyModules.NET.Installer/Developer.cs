using System;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Windows.Forms;
using System.Xml;
using EasyModules.NET.Installer.Properties;
using RTF;

namespace EasyModules.NET.Installer
{
    public partial class Developer : Form
    {
        private RTFBuilderbase ProgressText { get; set; }

        public Developer()
        {
            InitializeComponent();
        }

        private void DeveloperLoad(object sender, EventArgs e)
        {
            labelProjectPath.Text = Settings.Default.ProjectPath;
        }

        private void ButtonSelectProjectFolderClick(object sender, EventArgs e)
        {
            var projectfolder = new FolderBrowserDialog();
            projectfolder.ShowDialog();
            Settings.Default.ProjectPath = projectfolder.SelectedPath;
            Settings.Default.Save();
            labelProjectPath.Text = projectfolder.SelectedPath;
        }

        private void BtnDeployClick(object sender, EventArgs e)
        {
            progressBarDev.Value = 0;
            richTextBoxDeployment.Text = string.Empty;
            progressBarDev.Visible = true;
            ProgressText = new RTFBuilder();
            ProgressText.Clear();
            backgroundWorkerDev.RunWorkerAsync();
        }
        private void AppendToDeploymentLog(string message, bool error)
        {
            var color = error ? KnownColor.Red : KnownColor.Green;
            ProgressText.ForeColor(color).AppendLine(message);
        }
        internal static bool FileOrDirectoryExists(string name)
        {
            return (Directory.Exists(name) || File.Exists(name));
        }

        private static void ClearFolder(DirectoryInfo folderName)
        {
            foreach (var fi in folderName.GetFiles())
            {
                fi.Delete();
            }

            foreach (var di in folderName.GetDirectories())
            {
                var dir = new DirectoryInfo(di.FullName);
                ClearFolder(dir);
                di.Delete();
            }
        }
        private static void CopyFilesRecursively(DirectoryInfo source, DirectoryInfo target)
        {
            foreach (DirectoryInfo dir in source.GetDirectories())
                CopyFilesRecursively(dir, target.CreateSubdirectory(dir.Name));
            foreach (FileInfo file in source.GetFiles())
                file.CopyTo(Path.Combine(target.FullName, file.Name));
        }

        private void BackgroundWorkerDevDoWork(object sender, DoWorkEventArgs e)
        {
            var backgroundWorker = sender as BackgroundWorker;
            var now = string.Format("{0:yyyyMMddHHmmss}", System.DateTime.Now);
            if(backgroundWorker==null) return;
            //Get projectpath
            var projectPath = labelProjectPath.Text;
            if (!FileOrDirectoryExists(projectPath))
            {
                //Error the folder was not found
                AppendToDeploymentLog(Resources.The_selected_project_directory_does_not_exist, true);
                MessageBox.Show(Resources.The_selected_project_directory_does_not_exist);
                return;
            }
            AppendToDeploymentLog("Found projectfolder", false);
            //Set folder variables
            var installFolder = new DirectoryInfo(projectPath + @"\Install");
            var coreFolder = new DirectoryInfo(projectPath + @"\Install\Core");
            var moduleFolder = new DirectoryInfo(projectPath + @"\Install\Modules");
            var tempWorkFolder = new DirectoryInfo(projectPath + @"\Install\" + now + "_Temp");
            var tempWorkBinFolder = new DirectoryInfo(tempWorkFolder + @"\bin");
            var tempWorkModulesFolder = new DirectoryInfo(tempWorkFolder + @"\Modules");
            //Create workfolder if it does not exists
            if (tempWorkFolder.Exists)
            {
                ClearFolder(tempWorkFolder);
            }
            tempWorkFolder.Create();
            tempWorkModulesFolder.Create();
            //Copy from Core
            try
            {
                CopyFilesRecursively(coreFolder, tempWorkFolder);
            }
            catch (Exception exeption)
            {
                AppendToDeploymentLog("Error trying to copy from Core!" + Environment.NewLine + exeption, true);
                return;
            }
            backgroundWorker.ReportProgress(10);
            AppendToDeploymentLog("Finished copy from Core", false);
            //Copy from modules
            var countCurrentDir = 1;
            foreach (var moduleDirectory in moduleFolder.EnumerateDirectories())
            {
                var countDir = moduleFolder.EnumerateDirectories().Count();
                
                //get module information
                var moduleInfoFile = moduleDirectory.FullName + @"\module.config";
                if (File.Exists(moduleInfoFile))
                {
                    var xmlReaderModuleInfoFile = new XmlTextReader(moduleInfoFile) { WhitespaceHandling = WhitespaceHandling.None };
                    var xmlModuleInfo = new XmlDocument();
                    xmlModuleInfo.Load(xmlReaderModuleInfoFile);
                    XmlNode moduleFullWebSystemName = null;
                    if (xmlModuleInfo.DocumentElement != null)
                    {
                        moduleFullWebSystemName = xmlModuleInfo.DocumentElement.SelectSingleNode("FullWebSystemName");
                    }
                    if (moduleFullWebSystemName != null)
                    {
                        //copy module dll files
                        var moduleBinPath = new DirectoryInfo(moduleDirectory.FullName + @"\bin");
                        foreach (var dll in moduleBinPath.EnumerateFiles().Where(dll => dll.Name.Contains("EasyModules.NET.Modules") && dll.Extension == ".dll"))
                        {
                            try
                            {
                                dll.CopyTo(tempWorkBinFolder.FullName + @"\" + dll.Name);
                            }
                            catch (Exception ex)
                            {
                                AppendToDeploymentLog("Error trying to copy from module " + moduleDirectory.Name + "!" + Environment.NewLine + ex, true);
                                return;
                            }
                        }
                        //copy module views
                        var moduleViewsPath = new DirectoryInfo(moduleDirectory.FullName + @"\Views");
                        var tmpModuleViewsPath = new DirectoryInfo(tempWorkModulesFolder.FullName + @"\" +
                                              moduleFullWebSystemName.InnerText + @"\Views");
                        tmpModuleViewsPath.Create();
                        try
                        {
                            CopyFilesRecursively(moduleViewsPath, tmpModuleViewsPath);
                        }
                        catch(Exception eViews)
                        {
                            AppendToDeploymentLog("Error trying to copy Views from module " + moduleDirectory.Name + "!" + Environment.NewLine + eViews, true);
                            return;
                        }

                        //copy module content
                        var moduleContentPath = new DirectoryInfo(moduleDirectory.FullName + @"\Modules\" + moduleFullWebSystemName.InnerText);
                        var tmpWorkModuleContentFolder =
                            new DirectoryInfo(tempWorkModulesFolder.FullName + @"\" +
                                              moduleFullWebSystemName.InnerText);
                        tmpWorkModuleContentFolder.Create();
                        try
                        {
                            CopyFilesRecursively(moduleContentPath, tmpWorkModuleContentFolder);
                        }
                        catch (Exception exeption)
                        {
                            AppendToDeploymentLog("Error trying to copy Content from module " + moduleDirectory.Name + "!" + Environment.NewLine + exeption, true);
                            return;
                        }
                    }
                    else
                    {
                        AppendToDeploymentLog("Error trying to read FullWebSystemName from the module.config for module " + moduleDirectory.Name + "!" + Environment.NewLine + "The module " + moduleDirectory.Name + "was not added to the published site", true);
                    }
                    //We go so far so everything with the module must have gone well
                    var moduleProgress = 80/countDir*countCurrentDir;
                    backgroundWorker.ReportProgress(moduleProgress);
                    AppendToDeploymentLog("Finished copy from module " + moduleDirectory.Name, false);
                    countCurrentDir = countCurrentDir + 1;
                }
                else
                {
                    AppendToDeploymentLog("Error trying to read the module.config for module " + moduleDirectory.Name + "!" + Environment.NewLine + "The module " + moduleDirectory.Name + "was not added to the published site", true);
                }
            }

            //Zip the release
            string zipPath = installFolder.FullName + "\\" + now + @"_InstallPackage.zip";

            ZipFile.CreateFromDirectory(tempWorkFolder.FullName, zipPath);
            AppendToDeploymentLog("Zipped the files to: " + zipPath,false);

            //clear the workfolder
            var refreshedTempWorkFolder = new DirectoryInfo(tempWorkFolder.FullName);
            if (refreshedTempWorkFolder.Exists)
            {
                ClearFolder(refreshedTempWorkFolder);
                var clearedTempWorkFolder = new DirectoryInfo(tempWorkFolder.FullName);
                clearedTempWorkFolder.Delete();
            }

            //We got this far so everything went well
            backgroundWorker.ReportProgress(100);
            AppendToDeploymentLog("Finshed creating deployment packages", false);
        }

        private void BackgroundWorkerDevProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            progressBarDev.Value = e.ProgressPercentage;
        }

        private void BackgroundWorkerDevRunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            richTextBoxDeployment.Rtf = ProgressText.ToString();
        }



    }
}
