using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Extensions
{   
    // since it's extension we give a static keyword
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, 
            int currentPage, 
            int itemsPerPage, 
            int totalItems, 
            int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

            // changing our JSON response to be in JSON camel case, and pass it to Serialize method
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            // adding paginationheader object to header options
            // we need to serialize this because our response headers when we add this takes a key and and a string value 
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
            
            // because we are adding a custom header, we need to add a CORS header to make this header available
            // this has to be spelled exactly as it's spelled here
            // if this is spelled incorrectly  'Access-Control-Expose-Headers' you won't be seeing Pagination in headers of response
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}