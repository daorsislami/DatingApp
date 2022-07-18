using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{   

    // we used this class to modify the lastActive date of a user
    public class LogUserActivity : IAsyncActionFilter
    {   
        // ActionFilters allow us to do something before the request is executed or after the request is executed
        // ActionExecutingContext  --> gives access to HttpContext, ModelState, RouteData, Controller 
        // ActionExecutionDelegate --> whats gonna happened next after the action gets executed
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next(); // after the action has been executed we have a context

            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return; // if it's not authenticated then just simply return

            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();

            var user = await repo.GetUserByIdAsync(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
        }
    }
}