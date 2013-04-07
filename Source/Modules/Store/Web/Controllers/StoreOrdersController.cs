using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasyModules.NET.Modules.Store.Web.Models;

namespace EasyModules.NET.Modules.Store.Web.Controllers
{
    [Authorize]
    public class StoreOrdersController : ApiController
    {
        private OrdersContext db = new OrdersContext();

        // GET api/StoreOrders
        public IEnumerable<Order> GetOrders()
        {
            return db.Orders.AsEnumerable();
        }

        // GET api/StoreOrders/5
        public PublicOrderDto GetOrder(int id)
        {
            var order = db.Orders.Include("OrderDetails.Product")
                    .First(o => o.Id == id && o.Customer == User.Identity.Name);
            if (order == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return new PublicOrderDto
                       {
                Details = from d in order.OrderDetails
                          select new PublicOrderDto.Detail
                                     {
                              ProductId = d.Product.Id,
                              Product = d.Product.Name,
                              Price = d.Product.Price,
                              Quantity = d.Quantity
                          }
            };
        }



        // POST api/StoreOrders
        public HttpResponseMessage PostOrder(PublicOrderDto dto)
        {
            if (ModelState.IsValid)
            {
                var order = new Order
                                {
                    Customer = User.Identity.Name,
                    OrderDetails = (from item in dto.Details
                                    select new OrderDetail { ProductId = item.ProductId, Quantity = item.Quantity }).ToList()
                };

                db.Orders.Add(order);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, order);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = order.Id }));
                return response;
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // DELETE api/StoreOrders/5
        public HttpResponseMessage DeleteOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Orders.Remove(order);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, order);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}