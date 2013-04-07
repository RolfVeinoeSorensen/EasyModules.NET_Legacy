using System.Web.Mvc;

namespace EasyModules.NET.Modules.Games.Web
{
    public class ProjectInfo
    {
        public static string GetSolutionName()
        {
            const string exeAssemblyName = "EasyModules.NET.Modules.Games.Web";
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
            return "Welcome to the Games section!";
        }
    }
    public class ModuleAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get { return "Games"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            //context.MapRoute(
            //    "Games",
            //    "Games/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional });
        }
    }
}