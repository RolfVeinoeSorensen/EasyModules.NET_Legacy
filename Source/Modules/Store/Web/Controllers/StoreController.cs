using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyModules.NET.Modules.Store.Web.Controllers
{
    public class StoreController : Controller
    {
        //
        // GET: /Store/

        public ActionResult Index()
        {
            return View();
        }
        [Authorize(Roles = "Administrator")]
        public ActionResult Admin()
        {
            //string apiUri = Url.HttpRouteUrl("DefaultApi", new { controller = "storeadmin", });
            //ViewBag.ApiUrl = @"/api/storeadmin";//new Uri(Request.Url, apiUri).AbsoluteUri;

            return View();
        }
    }
}
