using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToolReplace.Models
{
    public class Project
    {
        public string SourceDir { get; set; }
        public string TargetDir { get; set; }
        public string ProjectName { get; set; }
        public string TitleName { get; set; }
        public string DateNote { get; set; }
        public string FileName { get; set; }
        public string FolderName { get; set; }
        public string ChacracterReplace { get; set; }
        public string NumberPort { get; set; }
        public OptionName PefixName { get; set; }

    }

    public enum OptionName {
        E,
        L,
        P,
        D
    }
}
