using System.Web.Mvc;

namespace EasyModules.NET.Modules.Store.Web
{
    public class ProjectInfo
    {
        public static string GetSolutionName()
        {
            const string exeAssemblyName = "EasyModules.NET.Modules.Store.Web";
            return exeAssemblyName;
        }
    }

    public interface IMessageRepository
    {
        string Message();
    }
    public class MessageRepository : IMessageRepository
    {
        public string Message()
        {
            return "Welcome to the Store section!";
        }
    }
    public class ModuleAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get { return "Store"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            //context.MapRoute(
            //    "Blog",
            //    "Blog/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional });
        }
    }
}