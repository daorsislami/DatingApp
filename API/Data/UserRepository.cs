using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider) // if we want to and we really want to get the data when querying and automatically return as DTO because it's more efficient we use ProjectTo
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            // return all of the users except for the current logged in user
            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            
            // filter based on Gender
            query = query.Where(u => u.Gender == userParams.Gender);

            // filder by age
            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge); 

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            // we don't have to add breaks a new switch version
            // clean and nice syntax
            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive) // the way we specify defaults in this switch statement is by underscore (_)
            };
            // when we get entities using EntityFrameworkCore, EFC applies tracking to these entities
            // since we do not do anything we disable that and the query will be more efficient
            
            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(), 
                userParams.PageNumber, userParams.PageSize
            );
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; // if we want to return a boolean we need to add the > 0, so if there are changes it will return either true or false, if it saves it will return greater than 0
        }

        public void Update(AppUser user)
        {
            // we're not changing anything in the database, but what we're doing is mark this entity that has been modified or updated
            // this let's EF to add a flag to the entity, like yep it's been modified
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}