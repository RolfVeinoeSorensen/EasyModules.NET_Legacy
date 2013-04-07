using System.Web.Mvc;

namespace EasyModules.NET.Modules.Games.Web.Controllers
{
    public class GamesController : Controller
    {
        private readonly IMessageRepository _repository;

        public GamesController(IMessageRepository repository)
        {
            _repository = repository;
        }

        public ActionResult Index(int? id)
        {
            var message = _repository.Message();
            ViewBag.Message = message;
            return View();
        }
        public ActionResult Ragnarok()
        {
            var message = _repository.Message();
            ViewBag.Message = message;
            return View();
        }
    }
}
