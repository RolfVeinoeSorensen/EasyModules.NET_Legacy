using System.Web.Mvc;

namespace EasyModules.NET.Modules.Blog.Web.Controllers
{
    public class BlogController : Controller
    {
        private readonly IMessageRepository _repository;

        public BlogController(IMessageRepository repository)
        {
            _repository = repository;
        }

        public ActionResult Index()
        {
            var message = _repository.Message();
            ViewBag.Message = message;
            return View();
        }
        public ActionResult ReadBlogPost()
        {
            var message = _repository.Message();
            ViewBag.Message = message;
            return View();
        }
    }
}
