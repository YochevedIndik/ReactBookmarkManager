using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarkManager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("getbookmarks")]
        [HttpGet]
        [Authorize]
        public List<Bookmark> GetBookmarks()
        {
            var userId = GetCurrentUser();
            var repo = new BookmarkRepository(_connectionString);
            var bookmarks = repo.GetByUser(userId);
            return bookmarks;
        }
        [Route("addbookmark")]
        [HttpPost]

        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.AddBookmark(bookmark);
        }
        [Route("update")]
        [HttpPost]
        [Authorize]
        public void Update(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.Edit(bookmark);
        }
        [Route("delete")]
        [HttpPost]
        [Authorize]
        public void Delete(int id)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.Delete(id);
        }
        [Route("gettopbookmarks")]
        [HttpGet]
        public List<TopBookmark> GetTopBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopBookmarks();
        }

        public int GetCurrentUser()
        {
            var repo = new BookmarkRepository(_connectionString);
            var user = repo.GetByEmail(User.Identity.Name);
            return user.Id;
        }
    }
}
