using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasyModules.NET.Modules.Store.Web.Models;

namespace EasyModules.NET.Modules.Store.Web.Controllers
{
    public class StoreProductsController : ApiController
    {
        private OrdersContext db = new OrdersContext();

        // Project products to product DTOs.
        private IQueryable<PublicProductDto> MapProducts()
        {
            return from p in db.Products
                   select new PublicProductDto() { Id = p.Id, Name = p.Name, Price = p.Price };
        }

        public IEnumerable<PublicProductDto> GetProducts()
        {
            return MapProducts().AsEnumerable();
        }

        public PublicProductDto GetProduct(int id)
        {
            var product = (from p in MapProducts()
                           where p.Id == 1
                           select p).FirstOrDefault();
            if (product == null)
            {
                throw new HttpResponseException(
                    Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return product;
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
