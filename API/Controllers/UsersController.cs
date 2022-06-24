using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{   
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            // IEnumerable allows us to use simple iteration over a collection of a specified type
            // we could use a List but List has more methods that we are not going to use here, we'll just iterate and get them
            // so we use a IEnumerable
            return Ok(await _userRepository.GetMembersAsync());
        }

        // api/users/floyd
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(String username) 
        {   
            return await _userRepository.GetMemberAsync(username); 
        }
    }
}