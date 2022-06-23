using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        // when creating a middleware we need to do certain things 
        // 
        // RequestDelegate is whats next, what coming up next in the middleware pipline 
        // ILogger<ExceptionMiddleware> because we want to output the error also in the terminal
        // IHostEnvironmet because we also want to keep track on what environment the error occured whether Development, Production 
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }


        
        public async Task InvokeAsync(HttpContext context) 
        {
            // this is the place where we will use try, catch block
            try
            {
                // the first thing we gonna do get our context and pass it to this next piece of middleware
                await _next(context);
            }
            catch(Exception ex)
            {
                // output this in terminal
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError; // effectively is gonna be a 500;

                var response = _env.IsDevelopment() 
                ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) 
                : new ApiException(context.Response.StatusCode, "Internal Server Error");


                // send back this in json, we want our json response to be sent as camelCase
                var option = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                
                var json = JsonSerializer.Serialize(response, option);

                await context.Response.WriteAsync(json);
            }
        }
    }
}