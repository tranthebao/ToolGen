using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ToolReplace.Models;
using ToolReplace.Ultils;

namespace ToolCloneTemplate
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void Form1_Load(object sender, EventArgs e)
        {
            if (tbpgm.Text.Trim().ToString() == string.Empty)
            {
                tbpgm.Text = GetSetting("PGM").Trim().ToString();
            }
            if (tbPathTemp.Text.Trim() == string.Empty)
            {
                tbPathTemp.Text = GetSetting("PathTemplate").Trim().ToString();
            }
            if (tbPathStore.Text.Trim() == string.Empty)
            {
                tbPathStore.Text = GetSetting("PathStore").Trim().ToString();
            }
        }
        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void btPathStore_Click(object sender, EventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    if (tbPathStore.Text.Trim().ToString() != string.Empty) {
                        switch (cbPgm.Text.Trim().ToString())
                        {
                            case "P":
                                tbPathStore.Text = fbd.SelectedPath.ToString().Trim() + @"\PrtDll\" + tbpgm.Text.Trim();
                                SetSetting("PathStore", fbd.SelectedPath.ToString().Trim() + @"\PrtDll\" + tbpgm.Text.Trim());
                                SetSetting("PathRoot", fbd.SelectedPath.ToString().Trim() + @"\PrtDll\");
                                break;
                            case "L":
                                tbPathStore.Text = fbd.SelectedPath.ToString().Trim() + @"\Report\" + tbpgm.Text.Trim();
                                SetSetting("PathStore", fbd.SelectedPath.ToString().Trim() + @"\Report\" + tbpgm.Text.Trim());
                                SetSetting("PathRoot", fbd.SelectedPath.ToString().Trim() + @"\Report\");
                                break;
                            case "E":
                                tbPathStore.Text = fbd.SelectedPath.ToString().Trim() + @"\VIPGME\" + tbpgm.Text.Trim();
                                SetSetting("PathStore", fbd.SelectedPath.ToString().Trim() + @"\VIPGME\" + tbpgm.Text.Trim());
                                SetSetting("PathRoot", fbd.SelectedPath.ToString().Trim() + @"\VIPGME\");
                                break;
                            case "D":
                                tbPathStore.Text = fbd.SelectedPath.ToString().Trim() + @"\Dialog\" + tbpgm.Text.Trim();
                                SetSetting("PathStore", fbd.SelectedPath.ToString().Trim() + @"\Dialog\" + tbpgm.Text.Trim());
                                SetSetting("PathRoot", fbd.SelectedPath.ToString().Trim() + @"\Dialog\");
                                break;
                            default: break;
                        }
                        SetSetting("PathTemp", fbd.SelectedPath.ToString().Trim());
                    }
                }
            }
        }

        private void btPathTemp_Click(object sender, EventArgs e)
        {
            //openFileDialogTemp.InitialDirectory = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location).ToString() + @"\Templates\"+ tbpgm.Text.Trim();
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    if (tbPathTemp.Text.Trim().ToString() != string.Empty)
                    {
                        tbPathTemp.Text = fbd.SelectedPath.ToString().Trim();
                        SetSetting("PathTemplate", fbd.SelectedPath.ToString().Trim());
                    }
                }
            }
        }
        private static void UpdateSetting(string key, string value)
        {
            Configuration configuration = ConfigurationManager.
                OpenExeConfiguration(Assembly.GetExecutingAssembly().Location);
            configuration.AppSettings.Settings[key].Value = value;
            configuration.Save();

            ConfigurationManager.RefreshSection("appSettings");
        }
        private static void SetSetting(string key, string value)
        {
            Configuration configuration =
                ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
            configuration.AppSettings.Settings[key].Value = value;
            configuration.Save(ConfigurationSaveMode.Full, true);
            ConfigurationManager.RefreshSection("appSettings");
        }
        private static string GetSetting(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        private void tbpgm_TextChanged(object sender, EventArgs e)
        {
            if (tbPathStore.Text.Trim().ToString() != string.Empty)
            {
                SetSetting("PGM", tbpgm.Text.Trim().ToString());
                tbPathStore.Text = GetSetting("PathRoot").Trim().ToString() + @"\" + tbpgm.Text.Trim();
                SetSetting("PathStore", tbPathStore.Text.Trim().ToString());
            }
        }

        private void btnGen_Click(object sender, EventArgs e)
        {
            //MessageBox.Show(cbPgm.Text);
            //if(cbPgm.Text)
            Project pro = new Project();
            ProcessDirectory pd = new ProcessDirectory();
            switch (cbPgm.Text.Trim().ToString()) {
                case "P":
                    pro.SourceDir = tbPathTemp.Text.Trim().ToString() + @"\{projectnamep}";
                    pro.PefixName = OptionName.P;
                    break;
                case "L":
                    pro.SourceDir = tbPathTemp.Text.Trim().ToString() + @"\{projectnamel}";
                    pro.PefixName = OptionName.L;
                    break;
                case "E":
                    pro.SourceDir = tbPathTemp.Text.Trim().ToString() + @"\{projectname}";
                    pro.PefixName = OptionName.E;
                    break;
                case "D":
                    pro.SourceDir = tbPathTemp.Text.Trim().ToString() + @"\{projectnamed}";
                    pro.PefixName = OptionName.D;
                    break;
                default: break;
            }
            
            pro.ProjectName = tbpgm.Text.Trim().ToString();
            pro.TitleName = pd.GetRemarks(@"C:\VSS_WORK\v21cr\CS\Sln\App\"+ tbTitlePGM.Text.Trim());
            pro.NumberPort = null;
            pro.FileName = tbpgm.Text.Trim().ToString();
            pro.TargetDir = tbPathStore.Text.Trim().ToString();
            pd.CopyDirectory(pro);
            pd.RepcaleFileNameAndContent(pro);
        }

        private void cbPgm_SelectedValueChanged(object sender, EventArgs e)
        {
            if (tbPathStore.Text.Trim().ToString() != string.Empty)
            {
                switch (cbPgm.Text.Trim().ToString())
                {
                    case "P":
                        tbPathStore.Text = GetSetting("PathTemp").Trim().ToString() + @"\PrtDll\" + tbpgm.Text.Trim();
                        break;
                    case "L":
                        tbPathStore.Text = GetSetting("PathTemp").Trim().ToString() + @"\Report\" + tbpgm.Text.Trim();
                        break;
                    case "E":
                        tbPathStore.Text = GetSetting("PathTemp").Trim().ToString() + @"\VIPGME\" + tbpgm.Text.Trim();
                        break;
                    case "D":
                        tbPathStore.Text = GetSetting("PathTemp").Trim().ToString() + @"\Dialog\" + tbpgm.Text.Trim();
                        break;
                    default: break;
                }
                SetSetting("PGM", tbpgm.Text.Trim().ToString());
                SetSetting("PathStore", tbPathStore.Text.Trim().ToString());
            }
        }
    }
}
