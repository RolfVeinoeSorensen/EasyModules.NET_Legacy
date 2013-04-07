using System.Web.Mvc;

namespace EasyModules.NET.Modules.Games.Web.Config
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}