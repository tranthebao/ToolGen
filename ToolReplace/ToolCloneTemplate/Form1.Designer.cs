namespace ToolCloneTemplate
{
    partial class Form1
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
            this.cbPgm = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.tbpgm = new System.Windows.Forms.TextBox();
            this.openFileDialogTemp = new System.Windows.Forms.OpenFileDialog();
            this.label2 = new System.Windows.Forms.Label();
            this.tbPathTemp = new System.Windows.Forms.TextBox();
            this.tbPathStore = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.btPathTemp = new System.Windows.Forms.Button();
            this.btPathStore = new System.Windows.Forms.Button();
            this.btnGen = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.tbTitlePGM = new System.Windows.Forms.TextBox();
            this.openFileDialogStore = new System.Windows.Forms.OpenFileDialog();
            this.SuspendLayout();
            // 
            // cbPgm
            // 
            this.cbPgm.FormattingEnabled = true;
            this.cbPgm.Items.AddRange(new object[] {
            "E",
            "L",
            "P",
            "D"});
            this.cbPgm.Location = new System.Drawing.Point(261, 12);
            this.cbPgm.Name = "cbPgm";
            this.cbPgm.Size = new System.Drawing.Size(121, 21);
            this.cbPgm.TabIndex = 0;
            this.cbPgm.Text = "P";
            this.cbPgm.SelectedValueChanged += new System.EventHandler(this.cbPgm_SelectedValueChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(15, 20);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(64, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Select PGM";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // tbpgm
            // 
            this.tbpgm.Location = new System.Drawing.Point(121, 13);
            this.tbpgm.Name = "tbpgm";
            this.tbpgm.Size = new System.Drawing.Size(100, 20);
            this.tbpgm.TabIndex = 2;
            this.tbpgm.TextChanged += new System.EventHandler(this.tbpgm_TextChanged);
            // 
            // openFileDialogTemp
            // 
            this.openFileDialogTemp.FileName = "openFileDialogTemp";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(18, 78);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(76, 13);
            this.label2.TabIndex = 3;
            this.label2.Text = "Path Template";
            // 
            // tbPathTemp
            // 
            this.tbPathTemp.Location = new System.Drawing.Point(121, 71);
            this.tbPathTemp.Name = "tbPathTemp";
            this.tbPathTemp.Size = new System.Drawing.Size(261, 20);
            this.tbPathTemp.TabIndex = 4;
            // 
            // tbPathStore
            // 
            this.tbPathStore.Location = new System.Drawing.Point(121, 102);
            this.tbPathStore.Name = "tbPathStore";
            this.tbPathStore.Size = new System.Drawing.Size(261, 20);
            this.tbPathStore.TabIndex = 6;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(18, 109);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(57, 13);
            this.label3.TabIndex = 5;
            this.label3.Text = "Path Store";
            // 
            // btPathTemp
            // 
            this.btPathTemp.Location = new System.Drawing.Point(388, 69);
            this.btPathTemp.Name = "btPathTemp";
            this.btPathTemp.Size = new System.Drawing.Size(75, 23);
            this.btPathTemp.TabIndex = 7;
            this.btPathTemp.Text = "Open";
            this.btPathTemp.UseVisualStyleBackColor = true;
            this.btPathTemp.Click += new System.EventHandler(this.btPathTemp_Click);
            // 
            // btPathStore
            // 
            this.btPathStore.Location = new System.Drawing.Point(388, 100);
            this.btPathStore.Name = "btPathStore";
            this.btPathStore.Size = new System.Drawing.Size(75, 23);
            this.btPathStore.TabIndex = 8;
            this.btPathStore.Text = "Open";
            this.btPathStore.UseVisualStyleBackColor = true;
            this.btPathStore.Click += new System.EventHandler(this.btPathStore_Click);
            // 
            // btnGen
            // 
            this.btnGen.Location = new System.Drawing.Point(202, 151);
            this.btnGen.Name = "btnGen";
            this.btnGen.Size = new System.Drawing.Size(75, 23);
            this.btnGen.TabIndex = 9;
            this.btnGen.Text = "Gen";
            this.btnGen.UseVisualStyleBackColor = true;
            this.btnGen.Click += new System.EventHandler(this.btnGen_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(18, 47);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(54, 13);
            this.label4.TabIndex = 10;
            this.label4.Text = "Title PGM";
            // 
            // tbTitlePGM
            // 
            this.tbTitlePGM.Location = new System.Drawing.Point(121, 45);
            this.tbTitlePGM.Name = "tbTitlePGM";
            this.tbTitlePGM.Size = new System.Drawing.Size(261, 20);
            this.tbTitlePGM.TabIndex = 11;
            // 
            // openFileDialogStore
            // 
            this.openFileDialogStore.FileName = "openFileDialogStore";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(471, 186);
            this.Controls.Add(this.tbTitlePGM);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.btnGen);
            this.Controls.Add(this.btPathStore);
            this.Controls.Add(this.btPathTemp);
            this.Controls.Add(this.tbPathStore);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.tbPathTemp);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.tbpgm);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.cbPgm);
            this.Name = "Form1";
            this.Text = "Clone template";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox cbPgm;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox tbpgm;
        private System.Windows.Forms.OpenFileDialog openFileDialogTemp;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox tbPathTemp;
        private System.Windows.Forms.TextBox tbPathStore;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btPathTemp;
        private System.Windows.Forms.Button btPathStore;
        private System.Windows.Forms.Button btnGen;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox tbTitlePGM;
        private System.Windows.Forms.OpenFileDialog openFileDialogStore;
    }
}

