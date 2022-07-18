using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers

    // we're creating this class to use for pagination
    // obviously we do not want for every pagination request to write the code in our repository take(5) skip(5)
    // so we do a general class called PageList
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; } // total nr of pages
        public int PageSize { get; set; } 
        public int TotalCount { get; set; } // how many items are in this query

        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize); // calculate based on how many results there are
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items); // this is a method from List class (super class) and we make use of this method
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync(); // this makes a db call returns the count of the result
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(); // this also makes a call to DB the logic for pagination
            
            return new PagedList<T>(items, count, pageNumber, pageSize);    
        }
    }
}