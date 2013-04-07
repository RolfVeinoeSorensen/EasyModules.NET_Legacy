using System.Reflection;

namespace EasyModules.NET.Core.Web.Config
{
    public class CoreConfig
    {
        public static string GetSolutionName()
        {
            string exeAssemblyName = Assembly.GetEntryAssembly().GetName().Name;
            return exeAssemblyName;
        }
    }
}