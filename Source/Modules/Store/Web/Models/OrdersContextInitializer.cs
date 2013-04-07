using System.Collections.Generic;
using System.Data.Entity;

namespace EasyModules.NET.Modules.Store.Web.Models
{
    public class OrdersContextInitializer : DropCreateDatabaseIfModelChanges<OrdersContext>
    {
        protected override void Seed(OrdersContext context)
        {
            var products = new List<Product>()            
            {
                new Product() { Name = "Tomato Soup", Price = 10, ActualCost = 9 },
                new Product() { Name = "Hammer", Price = 16, ActualCost = 10 },
                new Product() { Name = "Yo yo", Price = 6, ActualCost = 2 }
            };

            products.ForEach(p => context.Products.Add(p));
            context.SaveChanges();

            var order = new Order() { Customer = "Bob" };
            var od = new List<OrderDetail>()
            {
                new OrderDetail() { Product = products[0], Quantity = 2, Order = order},
                new OrderDetail() { Product = products[1], Quantity = 4, Order = order }
            };
            context.Orders.Add(order);
            od.ForEach(o => context.OrderDetails.Add(o));

            context.SaveChanges();
        }
    }
}