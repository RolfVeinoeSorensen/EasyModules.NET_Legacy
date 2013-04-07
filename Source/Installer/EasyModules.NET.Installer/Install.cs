using System;
using System.Windows.Forms;

namespace EasyModules.NET.Installer
{
    public partial class Install : Form
    {
        public Install()
        {
            InitializeComponent();
        }

        private void InstallLoad(object sender, EventArgs e)
        {

        }

        private void BtnDevClick(object sender, EventArgs e)
        {
            Hide();
            var dialog = new Developer();
            dialog.Closed += (objectsender, args) => Show();
            dialog.Show();
        }

        private void BtnInstallClick(object sender, EventArgs e)
        {
            Hide();
            var dialog = new Installer();
            dialog.Closed += (objectsender, args) => Show();
            dialog.Show();
        }

        private void BtnWebsiteClick(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("http://easymodules.net");
        }

        private void BtnGetStartedClick(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("http://easymodules.net");
        }



    }
}
