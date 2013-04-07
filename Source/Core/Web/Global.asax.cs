using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using EasyModules.NET.Core.Web.Config;
using EasyModules.NET.Core.Web.Engines;


namespace EasyModules.NET.Core.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new ViewEngine());

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);


            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //Use this for debugging routes in mvc
            //http://haacked.com/archive/2008/03/13/url-routing-debugger.aspx
            //RewriteRoutesForTesting(RouteTable.Routes);

            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.Initialize();
        }

    }
}