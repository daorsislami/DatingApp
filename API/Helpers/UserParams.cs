using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams
    {
        // the most amount of things that we're ever going to return from a request
        // we should always set this
        // these are some default settings when we set up the pagination
        private const int MaxPageSize = 50;
        
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;


        // whatever happens it's gonna be a maximum of 50 pages
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 150;

        public string OrderBy { get; set; } = "lastActive"; // by default we're gonna sort them when they were last active
    }
}