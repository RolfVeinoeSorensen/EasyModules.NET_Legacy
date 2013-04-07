using System.Web.Mvc;

namespace EasyModules.NET.Modules.Store.Web.Config
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}