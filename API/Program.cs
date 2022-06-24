using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // it is always recommended to seed data in our Main method, since we're dealing with seed data and db we change our methods return type to use async and Task obviously
            // we changed the CreateHostBuilder(args).Build().Run() because we wanted to get the services(DataContext, ILogger) to seed our data and to logg if any error occurred while seeding
            // now of course in the main method the global exception handler is not used because from here we start the server and we cannot catch any errors, so that's why we add try,catch block
            // and after of our configurations we then start the host by host.Run()
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync(); // MigrateAsync 
                await Seed.SeedUsers(context);
            }
            catch(Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during migration");
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
