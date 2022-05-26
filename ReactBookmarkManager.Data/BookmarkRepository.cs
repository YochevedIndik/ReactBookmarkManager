using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReactBookmarkManager.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;
        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new BookmarkDataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }


        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            return user;

        }

        public User GetByEmail(string email)
        {
            using var context = new BookmarkDataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
        public void AddBookmark(Bookmark b)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Add(b);
            context.SaveChanges();
        }
        public List<Bookmark> GetByUser(int userId)
        {
            using var context = new BookmarkDataContext(_connectionString);
           return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }
     public void Edit(Bookmark b)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title ={b.Title} WHERE Id ={b.Id} ");
           
        }
        public void Delete(int id)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Remove(context.Bookmarks.FirstOrDefault(b => b.Id == id));
            context.SaveChanges();
        }
        public List<TopBookmark> GetTopBookmarks()
        {
            using var context = new BookmarkDataContext(_connectionString);
            return context.Bookmarks.GroupBy(b => b.Url).Select(b => new TopBookmark
            {
                Url = b.Key,
                Count = b.Count()
            }).OrderByDescending(b => b.Count).Take(5).ToList();
        }
    }
}
