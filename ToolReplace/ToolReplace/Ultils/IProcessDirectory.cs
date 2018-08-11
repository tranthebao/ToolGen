using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToolReplace.Models;

namespace ToolReplace.Ultils
{
    public interface IProcessDirectory
    {
        void CopyDirectory(Project project);
        void RepcaleFileNameAndContent(Project project);
    }
}
