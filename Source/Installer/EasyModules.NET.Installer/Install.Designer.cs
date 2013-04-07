namespace EasyModules.NET.Installer
{
    partial class Install
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Install));
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.pictureBoxHeader = new System.Windows.Forms.PictureBox();
            this.btnWebsite = new System.Windows.Forms.Button();
            this.btnDeveloperTools = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.btnInstall = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.btnGetStarted = new System.Windows.Forms.Button();
            this.webBrowser1 = new System.Windows.Forms.WebBrowser();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHeader)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(761, 482);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(104, 17);
            this.label1.TabIndex = 3;
            this.label1.Text = "Developer Tools";
            // 
            // label2
            // 
            this.label2.Location = new System.Drawing.Point(510, 482);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(125, 52);
            this.label2.TabIndex = 4;
            this.label2.Text = "Visit EasyModules.NET";
            this.label2.TextAlign = System.Drawing.ContentAlignment.TopCenter;
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
            this.pictureBoxHeader.Size = new System.Drawing.Size(895, 65);
            this.pictureBoxHeader.TabIndex = 6;
            this.pictureBoxHeader.TabStop = false;
            // 
            // btnWebsite
            // 
            this.btnWebsite.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.Internet_Explorer_alt;
            this.btnWebsite.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btnWebsite.Location = new System.Drawing.Point(507, 350);
            this.btnWebsite.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.btnWebsite.Name = "btnWebsite";
            this.btnWebsite.Size = new System.Drawing.Size(128, 128);
            this.btnWebsite.TabIndex = 2;
            this.btnWebsite.UseVisualStyleBackColor = true;
            this.btnWebsite.Click += new System.EventHandler(this.BtnWebsiteClick);
            // 
            // btnDeveloperTools
            // 
            this.btnDeveloperTools.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.Configure_alt_3;
            this.btnDeveloperTools.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btnDeveloperTools.Location = new System.Drawing.Point(749, 350);
            this.btnDeveloperTools.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.btnDeveloperTools.Name = "btnDeveloperTools";
            this.btnDeveloperTools.Size = new System.Drawing.Size(128, 128);
            this.btnDeveloperTools.TabIndex = 0;
            this.btnDeveloperTools.UseVisualStyleBackColor = true;
            this.btnDeveloperTools.Click += new System.EventHandler(this.BtnDevClick);
            // 
            // label3
            // 
            this.label3.Location = new System.Drawing.Point(268, 482);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(116, 35);
            this.label3.TabIndex = 8;
            this.label3.Text = "Install EasyModules.NET";
            this.label3.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // btnInstall
            // 
            this.btnInstall.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.Windows_Update;
            this.btnInstall.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btnInstall.Location = new System.Drawing.Point(263, 350);
            this.btnInstall.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.btnInstall.Name = "btnInstall";
            this.btnInstall.Size = new System.Drawing.Size(128, 128);
            this.btnInstall.TabIndex = 7;
            this.btnInstall.UseVisualStyleBackColor = true;
            this.btnInstall.Click += new System.EventHandler(this.BtnInstallClick);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(37, 482);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(74, 17);
            this.label4.TabIndex = 10;
            this.label4.Text = "Get Started";
            // 
            // btnGetStarted
            // 
            this.btnGetStarted.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.Default;
            this.btnGetStarted.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btnGetStarted.Location = new System.Drawing.Point(14, 350);
            this.btnGetStarted.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.btnGetStarted.Name = "btnGetStarted";
            this.btnGetStarted.Size = new System.Drawing.Size(128, 128);
            this.btnGetStarted.TabIndex = 9;
            this.btnGetStarted.UseVisualStyleBackColor = true;
            this.btnGetStarted.Click += new System.EventHandler(this.BtnGetStartedClick);
            // 
            // webBrowser1
            // 
            this.webBrowser1.Location = new System.Drawing.Point(14, 72);
            this.webBrowser1.MinimumSize = new System.Drawing.Size(20, 20);
            this.webBrowser1.Name = "webBrowser1";
            this.webBrowser1.Size = new System.Drawing.Size(863, 250);
            this.webBrowser1.TabIndex = 12;
            this.webBrowser1.Url = new System.Uri("http://easymodules.net/applications/EasyModules.NET.Installer.Help/Default.htm", System.UriKind.Absolute);
            // 
            // Install
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(895, 551);
            this.Controls.Add(this.webBrowser1);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.btnGetStarted);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.btnInstall);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btnWebsite);
            this.Controls.Add(this.btnDeveloperTools);
            this.Controls.Add(this.pictureBoxHeader);
            this.Font = new System.Drawing.Font("Segoe UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.Name = "Install";
            this.Text = "Install EasyModules.NET";
            this.Load += new System.EventHandler(this.InstallLoad);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHeader)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnDeveloperTools;
        private System.Windows.Forms.Button btnWebsite;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox pictureBoxHeader;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btnInstall;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button btnGetStarted;
        private System.Windows.Forms.WebBrowser webBrowser1;
    }
}

