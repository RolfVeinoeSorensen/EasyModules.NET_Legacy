using System.Web.Mvc;

namespace EasyModules.NET.Core.Web.Controllers
{
    /// <summary>
    /// This is the MVC Controller for Home in the Core project
    /// </summary>
    public class HomeController : Controller
    {

        /// <summary>
        /// Returns the ActionResult for the default Home Controller
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {

            return View();
        }
    }
}
