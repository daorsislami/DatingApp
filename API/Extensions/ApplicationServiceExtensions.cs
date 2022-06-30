using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {


        // NOTE!! In order to extend e.g the IServiceCollection we need to use the 'this' keyword at parameteres
        
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUserRepository, UserRepository>();
            
            // we make use of our AutoMapper, so what it does is that it finds those profiles, the CreateMaps that we created inside AutoMapperProfiles
            // now to use this go into UsersController to see how we can make use of it, obv we use of DI for the mapper
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly); 


            services.AddDbContext<DataContext>(options => 
            {
                // we're using lambda expressions here it consists of name, token, body
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));  // we add our connection inside our configuration
            });
        }
    }
}