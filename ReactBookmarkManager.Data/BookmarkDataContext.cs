using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBookmarkManager.Data
{
    class BookmarkDataContext : DbContext
    {
        private readonly string _connectionString;
        public BookmarkDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<User> Users { get; set; }
        

    }
}
