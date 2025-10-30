using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductSpecParams productSpec) : base(x =>
            (productSpec.Brands.Count == 0 || productSpec.Brands.Contains(x.Brand)) &&
            (productSpec.Types.Count == 0 || productSpec.Types.Contains(x.Type)))
        {
            ApplyPaging(productSpec.PageSize * (productSpec.PageIndex - 1), productSpec.PageSize);

            switch (productSpec.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break; 
            }
        }
    }
}
