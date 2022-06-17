using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            // IEnumerable allows us to use simple iteration over a collection of a specified type
            // we could use a List but List has more methods that we are not going to use here, we'll just iterate and get them
            // so we use a IEnumerable
            return await _context.Users.ToListAsync();
        }

        // api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id) 
        {
            return await _context.Users.FindAsync(id);
        }
    }
}