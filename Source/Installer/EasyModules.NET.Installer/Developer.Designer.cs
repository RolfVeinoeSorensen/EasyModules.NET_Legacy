namespace EasyModules.NET.Installer
{
    partial class Developer
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Developer));
            this.folderBrowserDialogProject = new System.Windows.Forms.FolderBrowserDialog();
            this.buttonSelectProjectFolder = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.progressBar1 = new System.Windows.Forms.ProgressBar();
            this.label2 = new System.Windows.Forms.Label();
            this.btnInstall = new System.Windows.Forms.Button();
            this.labelProjectPath = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.progressBarDev = new System.Windows.Forms.ProgressBar();
            this.label3 = new System.Windows.Forms.Label();
            this.richTextBoxDeployment = new System.Windows.Forms.RichTextBox();
            this.btnDeploy = new System.Windows.Forms.Button();
            this.backgroundWorkerDev = new System.ComponentModel.BackgroundWorker();
            this.pictureBoxHeader = new System.Windows.Forms.PictureBox();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHeader)).BeginInit();
            this.SuspendLayout();
            // 
            // folderBrowserDialogProject
            // 
            this.folderBrowserDialogProject.RootFolder = System.Environment.SpecialFolder.MyComputer;
            // 
            // buttonSelectProjectFolder
            // 
            this.buttonSelectProjectFolder.ForeColor = System.Drawing.Color.Black;
            this.buttonSelectProjectFolder.Location = new System.Drawing.Point(7, 35);
            this.buttonSelectProjectFolder.Name = "buttonSelectProjectFolder";
            this.buttonSelectProjectFolder.Size = new System.Drawing.Size(406, 23);
            this.buttonSelectProjectFolder.TabIndex = 0;
            this.buttonSelectProjectFolder.Text = "Select Projectfolder";
            this.buttonSelectProjectFolder.UseVisualStyleBackColor = true;
            this.buttonSelectProjectFolder.Click += new System.EventHandler(this.ButtonSelectProjectFolderClick);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 19);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(396, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Path to where the Visual Studio 2012 project for EasyModules.NET will be installe" +
    "d";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.progressBar1);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.btnInstall);
            this.groupBox1.Controls.Add(this.labelProjectPath);
            this.groupBox1.Controls.Add(this.buttonSelectProjectFolder);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Location = new System.Drawing.Point(12, 86);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(560, 169);
            this.groupBox1.TabIndex = 2;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Installation";
            // 
            // progressBar1
            // 
            this.progressBar1.Location = new System.Drawing.Point(9, 124);
            this.progressBar1.Name = "progressBar1";
            this.progressBar1.Size = new System.Drawing.Size(406, 23);
            this.progressBar1.TabIndex = 9;
            this.progressBar1.Visible = false;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(432, 150);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(99, 13);
            this.label2.TabIndex = 6;
            this.label2.Text = "Install Source Code";
            // 
            // btnInstall
            // 
            this.btnInstall.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.Downloads_Library;
            this.btnInstall.Location = new System.Drawing.Point(419, 19);
            this.btnInstall.Name = "btnInstall";
            this.btnInstall.Size = new System.Drawing.Size(128, 128);
            this.btnInstall.TabIndex = 3;
            this.btnInstall.UseVisualStyleBackColor = true;
            // 
            // labelProjectPath
            // 
            this.labelProjectPath.AutoSize = true;
            this.labelProjectPath.Location = new System.Drawing.Point(6, 61);
            this.labelProjectPath.Name = "labelProjectPath";
            this.labelProjectPath.Size = new System.Drawing.Size(230, 13);
            this.labelProjectPath.TabIndex = 2;
            this.labelProjectPath.Text = "If you see this text here you need to select path";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.progressBarDev);
            this.groupBox2.Controls.Add(this.label3);
            this.groupBox2.Controls.Add(this.richTextBoxDeployment);
            this.groupBox2.Controls.Add(this.btnDeploy);
            this.groupBox2.Location = new System.Drawing.Point(12, 261);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(560, 172);
            this.groupBox2.TabIndex = 4;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Deployment";
            // 
            // progressBarDev
            // 
            this.progressBarDev.Location = new System.Drawing.Point(9, 124);
            this.progressBarDev.Name = "progressBarDev";
            this.progressBarDev.Size = new System.Drawing.Size(406, 23);
            this.progressBarDev.TabIndex = 8;
            this.progressBarDev.Visible = false;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(439, 148);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(89, 13);
            this.label3.TabIndex = 7;
            this.label3.Text = "Create Packages";
            // 
            // richTextBoxDeployment
            // 
            this.richTextBoxDeployment.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.richTextBoxDeployment.Location = new System.Drawing.Point(9, 19);
            this.richTextBoxDeployment.Name = "richTextBoxDeployment";
            this.richTextBoxDeployment.ReadOnly = true;
            this.richTextBoxDeployment.ScrollBars = System.Windows.Forms.RichTextBoxScrollBars.ForcedVertical;
            this.richTextBoxDeployment.Size = new System.Drawing.Size(404, 102);
            this.richTextBoxDeployment.TabIndex = 5;
            this.richTextBoxDeployment.Text = resources.GetString("richTextBoxDeployment.Text");
            // 
            // btnDeploy
            // 
            this.btnDeploy.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.Backup_and_Restore;
            this.btnDeploy.Location = new System.Drawing.Point(419, 19);
            this.btnDeploy.Name = "btnDeploy";
            this.btnDeploy.Size = new System.Drawing.Size(128, 128);
            this.btnDeploy.TabIndex = 4;
            this.btnDeploy.UseVisualStyleBackColor = true;
            this.btnDeploy.Click += new System.EventHandler(this.BtnDeployClick);
            // 
            // backgroundWorkerDev
            // 
            this.backgroundWorkerDev.WorkerReportsProgress = true;
            this.backgroundWorkerDev.DoWork += new System.ComponentModel.DoWorkEventHandler(this.BackgroundWorkerDevDoWork);
            this.backgroundWorkerDev.ProgressChanged += new System.ComponentModel.ProgressChangedEventHandler(this.BackgroundWorkerDevProgressChanged);
            this.backgroundWorkerDev.RunWorkerCompleted += new System.ComponentModel.RunWorkerCompletedEventHandler(this.BackgroundWorkerDevRunWorkerCompleted);
            // 
            // pictureBoxHeader
            // 
            this.pictureBoxHeader.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.eminstallerheader;
            this.pictureBoxHeader.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.pictureBoxHeader.Dock = System.Windows.Forms.DockStyle.Top;
            this.pictureBoxHeader.ErrorImage = null;
            this.pictureBoxHeader.InitialImage = null;
            this.pictureBoxHeader.Location = new System.Drawing.Point(0, 0);
            this.pictureBoxHeader.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.pictureBoxHeader.Name = "pictureBoxHeader";
            this.pictureBoxHeader.Size = new System.Drawing.Size(593, 65);
            this.pictureBoxHeader.TabIndex = 7;
            this.pictureBoxHeader.TabStop = false;
            // 
            // Developer
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(593, 451);
            this.Controls.Add(this.pictureBoxHeader);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Developer";
            this.Text = "Developer";
            this.Load += new System.EventHandler(this.DeveloperLoad);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHeader)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.FolderBrowserDialog folderBrowserDialogProject;
        private System.Windows.Forms.Button buttonSelectProjectFolder;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label labelProjectPath;
        private System.Windows.Forms.Button btnInstall;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button btnDeploy;
        private System.Windows.Forms.RichTextBox richTextBoxDeployment;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.ComponentModel.BackgroundWorker backgroundWorkerDev;
        private System.Windows.Forms.ProgressBar progressBarDev;
        private System.Windows.Forms.ProgressBar progressBar1;
        private System.Windows.Forms.PictureBox pictureBoxHeader;

    }
}