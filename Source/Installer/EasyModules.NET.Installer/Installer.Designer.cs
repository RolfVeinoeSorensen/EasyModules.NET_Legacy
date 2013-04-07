namespace EasyModules.NET.Installer
{
    partial class Installer
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Installer));
            this.pictureBoxHeader = new System.Windows.Forms.PictureBox();
            this.tabPageInstall = new System.Windows.Forms.TabPage();
            this.listViewModules = new System.Windows.Forms.ListView();
            this.label13 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.btnInstall = new System.Windows.Forms.Button();
            this.label15 = new System.Windows.Forms.Label();
            this.richTextBoxInstaller = new System.Windows.Forms.RichTextBox();
            this.tabPageOptions = new System.Windows.Forms.TabPage();
            this.radioButtonSettingsFtp = new System.Windows.Forms.RadioButton();
            this.radioButtonSettingsFileSystem = new System.Windows.Forms.RadioButton();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBoxDeploymentMethod = new System.Windows.Forms.GroupBox();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.textBox4 = new System.Windows.Forms.TextBox();
            this.richTextBoxFtp = new System.Windows.Forms.RichTextBox();
            this.btnFtpValidate = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.radioButton3 = new System.Windows.Forms.RadioButton();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.radioButton4 = new System.Windows.Forms.RadioButton();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label12 = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.textBox8 = new System.Windows.Forms.TextBox();
            this.textBox7 = new System.Windows.Forms.TextBox();
            this.textBox6 = new System.Windows.Forms.TextBox();
            this.textBox5 = new System.Windows.Forms.TextBox();
            this.richTextBoxSql = new System.Windows.Forms.RichTextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.tabControlInstaller = new System.Windows.Forms.TabControl();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHeader)).BeginInit();
            this.tabPageInstall.SuspendLayout();
            this.tabPageOptions.SuspendLayout();
            this.groupBoxDeploymentMethod.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.tabControlInstaller.SuspendLayout();
            this.SuspendLayout();
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
            this.pictureBoxHeader.Size = new System.Drawing.Size(894, 65);
            this.pictureBoxHeader.TabIndex = 7;
            this.pictureBoxHeader.TabStop = false;
            // 
            // tabPageInstall
            // 
            this.tabPageInstall.Controls.Add(this.richTextBoxInstaller);
            this.tabPageInstall.Controls.Add(this.label15);
            this.tabPageInstall.Controls.Add(this.btnInstall);
            this.tabPageInstall.Controls.Add(this.label14);
            this.tabPageInstall.Controls.Add(this.label13);
            this.tabPageInstall.Controls.Add(this.listViewModules);
            this.tabPageInstall.Location = new System.Drawing.Point(4, 26);
            this.tabPageInstall.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.tabPageInstall.Name = "tabPageInstall";
            this.tabPageInstall.Size = new System.Drawing.Size(886, 365);
            this.tabPageInstall.TabIndex = 2;
            this.tabPageInstall.Text = "Install";
            // 
            // listViewModules
            // 
            this.listViewModules.Location = new System.Drawing.Point(21, 58);
            this.listViewModules.Name = "listViewModules";
            this.listViewModules.Size = new System.Drawing.Size(691, 289);
            this.listViewModules.TabIndex = 4;
            this.listViewModules.UseCompatibleStateImageBehavior = false;
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(18, 38);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(265, 17);
            this.label13.TabIndex = 5;
            this.label13.Text = "Please check the modules you want installed";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Font = new System.Drawing.Font("Segoe UI", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label14.Location = new System.Drawing.Point(16, 13);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(140, 25);
            this.label14.TabIndex = 7;
            this.label14.Text = "Select Modules";
            // 
            // btnInstall
            // 
            this.btnInstall.BackgroundImage = global::EasyModules.NET.Installer.Properties.Resources.Windows_Update;
            this.btnInstall.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btnInstall.Location = new System.Drawing.Point(744, 58);
            this.btnInstall.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.btnInstall.Name = "btnInstall";
            this.btnInstall.Size = new System.Drawing.Size(128, 128);
            this.btnInstall.TabIndex = 9;
            this.btnInstall.UseVisualStyleBackColor = true;
            // 
            // label15
            // 
            this.label15.Location = new System.Drawing.Point(749, 190);
            this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(116, 35);
            this.label15.TabIndex = 10;
            this.label15.Text = "Install EasyModules.NET";
            this.label15.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // richTextBoxInstaller
            // 
            this.richTextBoxInstaller.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.richTextBoxInstaller.Location = new System.Drawing.Point(21, 58);
            this.richTextBoxInstaller.Name = "richTextBoxInstaller";
            this.richTextBoxInstaller.ScrollBars = System.Windows.Forms.RichTextBoxScrollBars.ForcedVertical;
            this.richTextBoxInstaller.Size = new System.Drawing.Size(691, 289);
            this.richTextBoxInstaller.TabIndex = 11;
            this.richTextBoxInstaller.Text = "";
            this.richTextBoxInstaller.Visible = false;
            // 
            // tabPageOptions
            // 
            this.tabPageOptions.Controls.Add(this.groupBox1);
            this.tabPageOptions.Controls.Add(this.radioButton4);
            this.tabPageOptions.Controls.Add(this.label4);
            this.tabPageOptions.Controls.Add(this.label3);
            this.tabPageOptions.Controls.Add(this.radioButton3);
            this.tabPageOptions.Controls.Add(this.label2);
            this.tabPageOptions.Controls.Add(this.groupBoxDeploymentMethod);
            this.tabPageOptions.Controls.Add(this.label1);
            this.tabPageOptions.Controls.Add(this.radioButtonSettingsFileSystem);
            this.tabPageOptions.Controls.Add(this.radioButtonSettingsFtp);
            this.tabPageOptions.Location = new System.Drawing.Point(4, 26);
            this.tabPageOptions.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.tabPageOptions.Name = "tabPageOptions";
            this.tabPageOptions.Padding = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.tabPageOptions.Size = new System.Drawing.Size(886, 365);
            this.tabPageOptions.TabIndex = 0;
            this.tabPageOptions.Text = "Options";
            // 
            // radioButtonSettingsFtp
            // 
            this.radioButtonSettingsFtp.AutoSize = true;
            this.radioButtonSettingsFtp.Checked = true;
            this.radioButtonSettingsFtp.Location = new System.Drawing.Point(13, 59);
            this.radioButtonSettingsFtp.Name = "radioButtonSettingsFtp";
            this.radioButtonSettingsFtp.Size = new System.Drawing.Size(46, 21);
            this.radioButtonSettingsFtp.TabIndex = 0;
            this.radioButtonSettingsFtp.TabStop = true;
            this.radioButtonSettingsFtp.Text = "FTP";
            this.radioButtonSettingsFtp.UseVisualStyleBackColor = true;
            // 
            // radioButtonSettingsFileSystem
            // 
            this.radioButtonSettingsFileSystem.AutoSize = true;
            this.radioButtonSettingsFileSystem.Location = new System.Drawing.Point(88, 59);
            this.radioButtonSettingsFileSystem.Name = "radioButtonSettingsFileSystem";
            this.radioButtonSettingsFileSystem.Size = new System.Drawing.Size(86, 21);
            this.radioButtonSettingsFileSystem.TabIndex = 1;
            this.radioButtonSettingsFileSystem.Text = "FileSystem";
            this.radioButtonSettingsFileSystem.UseVisualStyleBackColor = true;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(10, 39);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(166, 17);
            this.label1.TabIndex = 2;
            this.label1.Text = "Select Deployment Method";
            // 
            // groupBoxDeploymentMethod
            // 
            this.groupBoxDeploymentMethod.Controls.Add(this.btnFtpValidate);
            this.groupBoxDeploymentMethod.Controls.Add(this.richTextBoxFtp);
            this.groupBoxDeploymentMethod.Controls.Add(this.textBox4);
            this.groupBoxDeploymentMethod.Controls.Add(this.textBox3);
            this.groupBoxDeploymentMethod.Controls.Add(this.textBox2);
            this.groupBoxDeploymentMethod.Controls.Add(this.textBox1);
            this.groupBoxDeploymentMethod.Controls.Add(this.label8);
            this.groupBoxDeploymentMethod.Controls.Add(this.label7);
            this.groupBoxDeploymentMethod.Controls.Add(this.label6);
            this.groupBoxDeploymentMethod.Controls.Add(this.label5);
            this.groupBoxDeploymentMethod.Location = new System.Drawing.Point(11, 92);
            this.groupBoxDeploymentMethod.Name = "groupBoxDeploymentMethod";
            this.groupBoxDeploymentMethod.Size = new System.Drawing.Size(408, 265);
            this.groupBoxDeploymentMethod.TabIndex = 3;
            this.groupBoxDeploymentMethod.TabStop = false;
            this.groupBoxDeploymentMethod.Text = "FTP";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(6, 21);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(35, 17);
            this.label5.TabIndex = 9;
            this.label5.Text = "Host";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(6, 52);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(67, 17);
            this.label6.TabIndex = 10;
            this.label6.Text = "Username";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(6, 83);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(64, 17);
            this.label7.TabIndex = 11;
            this.label7.Text = "Password";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(6, 114);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(32, 17);
            this.label8.TabIndex = 12;
            this.label8.Text = "Port";
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(109, 13);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(293, 25);
            this.textBox1.TabIndex = 13;
            // 
            // textBox2
            // 
            this.textBox2.Location = new System.Drawing.Point(109, 44);
            this.textBox2.Name = "textBox2";
            this.textBox2.Size = new System.Drawing.Size(293, 25);
            this.textBox2.TabIndex = 14;
            // 
            // textBox3
            // 
            this.textBox3.Location = new System.Drawing.Point(109, 75);
            this.textBox3.Name = "textBox3";
            this.textBox3.Size = new System.Drawing.Size(293, 25);
            this.textBox3.TabIndex = 15;
            // 
            // textBox4
            // 
            this.textBox4.Location = new System.Drawing.Point(109, 106);
            this.textBox4.Name = "textBox4";
            this.textBox4.Size = new System.Drawing.Size(293, 25);
            this.textBox4.TabIndex = 16;
            // 
            // richTextBoxFtp
            // 
            this.richTextBoxFtp.BackColor = System.Drawing.Color.White;
            this.richTextBoxFtp.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.richTextBoxFtp.Location = new System.Drawing.Point(9, 146);
            this.richTextBoxFtp.Name = "richTextBoxFtp";
            this.richTextBoxFtp.ReadOnly = true;
            this.richTextBoxFtp.ScrollBars = System.Windows.Forms.RichTextBoxScrollBars.ForcedVertical;
            this.richTextBoxFtp.Size = new System.Drawing.Size(393, 75);
            this.richTextBoxFtp.TabIndex = 17;
            this.richTextBoxFtp.Text = "";
            // 
            // btnFtpValidate
            // 
            this.btnFtpValidate.Location = new System.Drawing.Point(9, 227);
            this.btnFtpValidate.Name = "btnFtpValidate";
            this.btnFtpValidate.Size = new System.Drawing.Size(393, 32);
            this.btnFtpValidate.TabIndex = 9;
            this.btnFtpValidate.Text = "Validate FTP Settings";
            this.btnFtpValidate.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Segoe UI", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(465, 14);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(201, 25);
            this.label2.TabIndex = 4;
            this.label2.Text = "Microsoft SQL Options";
            // 
            // radioButton3
            // 
            this.radioButton3.AutoSize = true;
            this.radioButton3.Location = new System.Drawing.Point(470, 59);
            this.radioButton3.Name = "radioButton3";
            this.radioButton3.Size = new System.Drawing.Size(165, 21);
            this.radioButton3.TabIndex = 5;
            this.radioButton3.Text = "Windows Authentication";
            this.radioButton3.UseVisualStyleBackColor = true;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Segoe UI", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(8, 14);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(151, 25);
            this.label3.TabIndex = 6;
            this.label3.Text = "Website Options";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(467, 39);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(173, 17);
            this.label4.TabIndex = 7;
            this.label4.Text = "Select Authorization Method";
            // 
            // radioButton4
            // 
            this.radioButton4.AutoSize = true;
            this.radioButton4.Location = new System.Drawing.Point(641, 59);
            this.radioButton4.Name = "radioButton4";
            this.radioButton4.Size = new System.Drawing.Size(176, 21);
            this.radioButton4.TabIndex = 8;
            this.radioButton4.Text = "SQL Server Authentication";
            this.radioButton4.UseVisualStyleBackColor = true;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.button1);
            this.groupBox1.Controls.Add(this.richTextBoxSql);
            this.groupBox1.Controls.Add(this.textBox5);
            this.groupBox1.Controls.Add(this.textBox6);
            this.groupBox1.Controls.Add(this.textBox7);
            this.groupBox1.Controls.Add(this.textBox8);
            this.groupBox1.Controls.Add(this.label9);
            this.groupBox1.Controls.Add(this.label10);
            this.groupBox1.Controls.Add(this.label11);
            this.groupBox1.Controls.Add(this.label12);
            this.groupBox1.Location = new System.Drawing.Point(470, 92);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(408, 265);
            this.groupBox1.TabIndex = 18;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "FTP";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(6, 21);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(35, 17);
            this.label12.TabIndex = 9;
            this.label12.Text = "Host";
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(6, 52);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(67, 17);
            this.label11.TabIndex = 10;
            this.label11.Text = "Username";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(6, 83);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(64, 17);
            this.label10.TabIndex = 11;
            this.label10.Text = "Password";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(6, 114);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(32, 17);
            this.label9.TabIndex = 12;
            this.label9.Text = "Port";
            // 
            // textBox8
            // 
            this.textBox8.Location = new System.Drawing.Point(109, 13);
            this.textBox8.Name = "textBox8";
            this.textBox8.Size = new System.Drawing.Size(293, 25);
            this.textBox8.TabIndex = 13;
            // 
            // textBox7
            // 
            this.textBox7.Location = new System.Drawing.Point(109, 44);
            this.textBox7.Name = "textBox7";
            this.textBox7.Size = new System.Drawing.Size(293, 25);
            this.textBox7.TabIndex = 14;
            // 
            // textBox6
            // 
            this.textBox6.Location = new System.Drawing.Point(109, 75);
            this.textBox6.Name = "textBox6";
            this.textBox6.Size = new System.Drawing.Size(293, 25);
            this.textBox6.TabIndex = 15;
            // 
            // textBox5
            // 
            this.textBox5.Location = new System.Drawing.Point(109, 106);
            this.textBox5.Name = "textBox5";
            this.textBox5.Size = new System.Drawing.Size(293, 25);
            this.textBox5.TabIndex = 16;
            // 
            // richTextBoxSql
            // 
            this.richTextBoxSql.BackColor = System.Drawing.Color.White;
            this.richTextBoxSql.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.richTextBoxSql.Location = new System.Drawing.Point(9, 146);
            this.richTextBoxSql.Name = "richTextBoxSql";
            this.richTextBoxSql.ReadOnly = true;
            this.richTextBoxSql.ScrollBars = System.Windows.Forms.RichTextBoxScrollBars.ForcedVertical;
            this.richTextBoxSql.Size = new System.Drawing.Size(393, 75);
            this.richTextBoxSql.TabIndex = 17;
            this.richTextBoxSql.Text = "";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(9, 227);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(393, 32);
            this.button1.TabIndex = 9;
            this.button1.Text = "Validate SQL Settings";
            this.button1.UseVisualStyleBackColor = true;
            // 
            // tabControlInstaller
            // 
            this.tabControlInstaller.Controls.Add(this.tabPageOptions);
            this.tabControlInstaller.Controls.Add(this.tabPageInstall);
            this.tabControlInstaller.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.tabControlInstaller.Location = new System.Drawing.Point(0, 73);
            this.tabControlInstaller.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.tabControlInstaller.Name = "tabControlInstaller";
            this.tabControlInstaller.SelectedIndex = 0;
            this.tabControlInstaller.Size = new System.Drawing.Size(894, 395);
            this.tabControlInstaller.TabIndex = 0;
            // 
            // Installer
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(894, 468);
            this.Controls.Add(this.pictureBoxHeader);
            this.Controls.Add(this.tabControlInstaller);
            this.Font = new System.Drawing.Font("Segoe UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.Name = "Installer";
            this.Text = "Installer";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxHeader)).EndInit();
            this.tabPageInstall.ResumeLayout(false);
            this.tabPageInstall.PerformLayout();
            this.tabPageOptions.ResumeLayout(false);
            this.tabPageOptions.PerformLayout();
            this.groupBoxDeploymentMethod.ResumeLayout(false);
            this.groupBoxDeploymentMethod.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.tabControlInstaller.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBoxHeader;
        private System.Windows.Forms.TabPage tabPageInstall;
        private System.Windows.Forms.RichTextBox richTextBoxInstaller;
        private System.Windows.Forms.Label label15;
        private System.Windows.Forms.Button btnInstall;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.ListView listViewModules;
        private System.Windows.Forms.TabPage tabPageOptions;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.RichTextBox richTextBoxSql;
        private System.Windows.Forms.TextBox textBox5;
        private System.Windows.Forms.TextBox textBox6;
        private System.Windows.Forms.TextBox textBox7;
        private System.Windows.Forms.TextBox textBox8;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.RadioButton radioButton4;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.RadioButton radioButton3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.GroupBox groupBoxDeploymentMethod;
        private System.Windows.Forms.Button btnFtpValidate;
        private System.Windows.Forms.RichTextBox richTextBoxFtp;
        private System.Windows.Forms.TextBox textBox4;
        private System.Windows.Forms.TextBox textBox3;
        private System.Windows.Forms.TextBox textBox2;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.RadioButton radioButtonSettingsFileSystem;
        private System.Windows.Forms.RadioButton radioButtonSettingsFtp;
        private System.Windows.Forms.TabControl tabControlInstaller;
    }
}