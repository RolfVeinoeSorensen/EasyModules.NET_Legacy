using System.Web.Mvc;
using System.Web.Routing;

namespace EasyModules.NET.Core.Web.Config
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                 new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                 new[] { "EasyModules.NET.Core.Web.Controllers" }
            );
        }
    }
}