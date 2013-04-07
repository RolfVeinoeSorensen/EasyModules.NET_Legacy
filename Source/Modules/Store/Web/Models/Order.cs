using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyModules.NET.Modules.Store.Web.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public string Customer { get; set; }

        // Navigation property
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
    public class PublicOrderDto
    {
        public class Detail
        {
            public int ProductId { get; set; }
            public string Product { get; set; }
            public decimal Price { get; set; }
            public int Quantity { get; set; }
        }
        public IEnumerable<Detail> Details { get; set; }
    }
}