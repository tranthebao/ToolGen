using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ToolReplace.Models;

namespace ToolReplace.Ultils
{
    public class ProcessDirectory: IProcessDirectory
    {
        public string GetRemarks(string path)
        {
            string result = string.Empty;
            //string path = @"C:\VSS_WORK\v21cr\CS\Sln\App\nfa200e";
            string[] filePaths = Directory.GetFiles(path);
            foreach (var file in filePaths)
            {
                FileInfo fi = new FileInfo(file);
                if (fi.Extension.Contains(".cs") && fi.Name.Contains("Form01"))
                {
                    string text = File.ReadAllText(file, Encoding.GetEncoding(932));
                    string[] results = GetLines(text);
                    foreach (var str in results)
                    {
                        if (str.Trim().Contains("//REMARKS") || str.Trim().Contains("// REMARKS"))
                        {
                            string strText = Regex.Replace(str, @"[\s+]", "");
                            strText = Regex.Replace(strText, @"[\s+|@|&|'|<|>|#/]|[a-zA-z]|[0-9]", "");
                            result = strText.Trim();
                            break;
                        }
                    }
                }
            }
            return result;
        }
        public void CopyDirectory(Project project)
        {
            DirectoryInfo diSource = new DirectoryInfo(project.SourceDir);
            DirectoryInfo diTarget = new DirectoryInfo(project.TargetDir);

            CopyAll(diSource, diTarget);

        }
        public void RepcaleFileNameAndContent(Project project)
        {
            string[] files = Directory.GetFiles(project.TargetDir, "*.*", SearchOption.AllDirectories);
            foreach (string file in files)
            {
                try
                {
                    
                    FileInfo fi= new FileInfo(file);
                    switch ((int)project.PefixName) {
                        case (int)OptionName.L:
                            #region Report
                            string pathnew = string.Empty;
                            if (fi.Extension.ToString().Contains(".csproj") ||
                                fi.Extension.ToString().Contains(".sln") ||
                                fi.Extension.ToString().Contains(".ts") ||
                                fi.Extension.ToString().Contains(".user"))
                            {
                                pathnew = project.TargetDir + @"\" + project.FileName + fi.Extension;
                                if (fi.Name.Contains("{projectnamel}"))
                                    RenameFile(file.ToString(), pathnew);
                                FileInfo fiNew = new FileInfo(pathnew);
                                string contents = File.ReadAllText(pathnew);
                                switch (fiNew.Extension.ToString())
                                {
                                    case ".sln":
                                    case ".csproj":
                                        contents = contents.Replace(@"{projectnamel}", project.FileName.ToString().Trim());
                                        //// Make files writable
                                        File.SetAttributes(pathnew, FileAttributes.Normal);
                                        File.WriteAllText(pathnew, contents);
                                        break;
                                    case ".ts":
                                        contents = contents.Replace(@"{projectnamel}", project.FileName.ToUpper().ToString().Trim());
                                        contents = contents.Replace(@"{DateNote}", DateTime.Now.ToString("yyyy.MM.dd"));
                                        contents = contents.Replace(@"{TitleName}", project.TitleName);
                                        //// Make files writable
                                        File.SetAttributes(pathnew, FileAttributes.Normal);
                                        File.WriteAllText(pathnew, contents);
                                        break;
                                    default: break;
                                }
                                fiNew = null;
                            }
                            pathnew = string.Empty;
                            fi = null;
                            #endregion
                            break;
                        case (int)OptionName.P:
                            #region Report Api
                            string pathnewp = string.Empty;
                            if (fi.Extension.ToString().Contains(".csproj") ||
                                fi.Extension.ToString().Contains(".sln") ||
                                //fi.Extension.ToString().Contains(".cs") ||
                                fi.Extension.ToString().Contains(".user"))
                            {
                                pathnewp = project.TargetDir + @"\" + project.FileName + fi.Extension;
                                if (fi.Name.Contains("{projectnamep}"))
                                    RenameFile(file.ToString(), pathnewp);
                                FileInfo fiNew = new FileInfo(pathnewp);
                                string contents = File.ReadAllText(pathnewp);
                                switch (fiNew.Extension.ToString())
                                {
                                    case ".sln":
                                    case ".csproj":
                                        contents = contents.Replace(@"{projectnamep}", project.FileName.ToString().Trim());
                                        //// Make files writable
                                        File.SetAttributes(pathnewp, FileAttributes.Normal);
                                        File.WriteAllText(pathnewp, contents);
                                        break;
                                    default: break;
                                }
                                fiNew = null;
                            }
                            else {
                                string contents = File.ReadAllText(file);
                                if (fi.Extension.ToString().Contains(".cs")) {
                                    contents = contents.Replace(@"{projectnamep}", project.FileName.ToString().Trim());
                                    //contents = contents.Replace(@"{DateNote}", DateTime.Now.ToString("yyyy.MM.dd"));
                                    //contents = contents.Replace(@"{TitleName}", project.TitleName);
                                    //// Make files writable
                                    File.SetAttributes(file, FileAttributes.Normal);
                                    File.WriteAllText(file, contents);
                                }
                            }
                            pathnewp = string.Empty;
                            fi = null;
                            #endregion
                            break;
                        case (int)OptionName.E:
                            #region View detail, view input
                            string pathnewe = string.Empty;
                            if (fi.Extension.ToString().Contains(".csproj") ||
                                fi.Extension.ToString().Contains(".sln") ||
                                fi.Extension.ToString().Contains(".ts") ||
                                fi.Extension.ToString().Contains(".user"))
                            {
                                pathnewe = project.TargetDir + @"\" + project.FileName + fi.Extension;
                                if (fi.Name.Contains("{projectname}"))
                                    RenameFile(file.ToString(), pathnewe);
                                FileInfo fiNew = new FileInfo(pathnewe);
                                string contents = File.ReadAllText(pathnewe);
                                switch (fiNew.Extension.ToString())
                                {
                                    case ".sln":
                                    case ".csproj":
                                        contents = contents.Replace(@"{projectname}", project.FileName.ToString().Trim());
                                        //// Make files writable
                                        File.SetAttributes(pathnewe, FileAttributes.Normal);
                                        File.WriteAllText(pathnewe, contents);
                                        break;
                                    case ".ts":
                                        contents = contents.Replace(@"{ProjectName}", project.FileName.ToUpper().ToString().Trim());
                                        contents = contents.Replace(@"{DateNote}", DateTime.Now.ToString("yyyy.MM.dd"));
                                        contents = contents.Replace(@"{TitleName}", project.TitleName);
                                        //// Make files writable
                                        File.SetAttributes(pathnewe, FileAttributes.Normal);
                                        File.WriteAllText(pathnewe, contents);
                                        break;
                                    default: break;
                                }
                                fiNew = null;
                            }
                            pathnewe = string.Empty;
                            fi = null;
                            #endregion
                            break;
                        case (int)OptionName.D:
                            #region Dialog
                            string pathnewd = string.Empty;
                            if (fi.Extension.ToString().Contains(".csproj") ||
                                fi.Extension.ToString().Contains(".sln") ||
                                fi.Extension.ToString().Contains(".ts") ||
                                fi.Extension.ToString().Contains(".user")||
                                fi.Extension.ToString().Contains(".css"))
                            {
                                pathnewd = project.TargetDir + @"\" + project.FileName + fi.Extension;
                                if (fi.Name.Contains("{projectnamed}"))
                                    RenameFile(file.ToString(), pathnewd);
                                FileInfo fiNew = new FileInfo(pathnewd);
                                string contents = File.ReadAllText(pathnewd);
                                switch (fiNew.Extension.ToString())
                                {
                                    case ".sln":
                                    case ".csproj":
                                        contents = contents.Replace(@"{projectnamel}", project.FileName.ToString().Trim());
                                        //// Make files writable
                                        File.SetAttributes(pathnewd, FileAttributes.Normal);
                                        File.WriteAllText(pathnewd, contents);
                                        break;
                                    case ".ts":
                                        contents = contents.Replace(@"{ProjectName}", project.FileName.ToUpper().ToString().Trim());
                                        contents = contents.Replace(@"{DateNote}", DateTime.Now.ToString("yyyy.MM.dd"));
                                        contents = contents.Replace(@"{TitleName}", project.TitleName);
                                        //// Make files writable
                                        File.SetAttributes(pathnewd, FileAttributes.Normal);
                                        File.WriteAllText(pathnewd, contents);
                                        break;
                                    case ".css":
                                        contents = contents.Replace(@"{projectnamed}", project.FileName.ToString().Trim());
                                        //// Make files writable
                                        File.SetAttributes(pathnewd, FileAttributes.Normal);
                                        File.WriteAllText(pathnewd, contents);
                                        break;
                                    default: break;
                                }
                                fiNew = null;
                            }
                            pathnewd = string.Empty;
                            fi = null;
                            #endregion
                            break;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
        public override string ToString()
        {
            return base.ToString();
        }
        #region function private
        private void CopyAll(DirectoryInfo source, DirectoryInfo target)
        {
            Directory.CreateDirectory(target.FullName);

            // Copy each file into the new directory.
            foreach (FileInfo fi in source.GetFiles())
            {
                Console.WriteLine(@"Copying {0}\{1}", target.FullName, fi.Name);
                fi.CopyTo(Path.Combine(target.FullName, fi.Name), true);
            }

            // Copy each subdirectory using recursion.
            foreach (DirectoryInfo diSourceSubDir in source.GetDirectories())
            {
                DirectoryInfo nextTargetSubDir =
                    target.CreateSubdirectory(diSourceSubDir.Name);
                CopyAll(diSourceSubDir, nextTargetSubDir);
            }
        }
        private void RenameFile(string pathFilleOld, string pathFielNew)
        {
            if (File.Exists(pathFielNew))
            {
                File.Delete(pathFielNew);
            }
            File.Move(pathFilleOld, pathFielNew);
        }
        private string[] GetLines(string text)
        {

            List<string> lines = new List<string>();
            using (MemoryStream ms = new MemoryStream())
            {
                StreamWriter sw = new StreamWriter(ms);
                sw.Write(text);
                sw.Flush();

                ms.Position = 0;

                string line;

                using (StreamReader sr = new StreamReader(ms))
                {
                    while ((line = sr.ReadLine()) != null)
                    {
                        lines.Add(line);
                    }
                }
                sw.Close();
            }



            return lines.ToArray();
        }
        #endregion
    }
}
