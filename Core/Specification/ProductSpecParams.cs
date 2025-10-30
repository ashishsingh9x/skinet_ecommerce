using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class ProductSpecParams
    {
        private List<string> _brands = [];
        private List<string> _types = [];


        public List<string> Brands
        {
            get => _brands;
            set
            {
                _brands = value.SelectMany(x => x.Split(',',
                    StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }

        public List<string> Types
        {
            get => _types;
            set
            {
                _types = value.SelectMany(x => x.Split(',',
                    StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }

        public string? Sort { get; set; }
    }
}
