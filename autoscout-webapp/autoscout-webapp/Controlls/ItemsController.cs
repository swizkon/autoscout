using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Features;
using Autoscout.Hubs;
using Autoscout.Domain.Models;
using System.Collections.Concurrent;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace Autoscout.Controllers
{
    [Route("api/[controller]/{listid}")]
    public class ItemsController : Controller
    {
        private readonly IHubContext<ListMessageHub> _hubContext;

        private readonly CloudTable _testTable;

        public ItemsController(IConfiguration configuration, IHubContext<ListMessageHub> hubContext)
        {
            _hubContext = hubContext;

            var account = CloudStorageAccount.Parse(configuration["StorageConnectionString"]);
            var tableClient = account.CreateCloudTableClient();

            _testTable = tableClient.GetTableReference("Tester");
            _testTable.CreateIfNotExistsAsync().Wait();
        }

        [HttpGet]
        public IEnumerable<Item> Get()
        {
            return new List<Item>();
        }

        /*
        [HttpGet("{id}")]
        public RaceState Get(string id)
        {
            var race = states.GetValueOrDefault(RaceId());
            return race?.FirstOrDefault(x => x.RiderId == id);
        }
        */

        [HttpPost("{id}")]
        public void Post(string id, [FromQuery]string title)
        {
            _hubContext.Clients.All.InvokeAsync("ItemAccepted", title, ListId());
        }

        /*
        [HttpPut("{id}")]
        public void Put(string id, [FromQuery]string key)
        {
            var state = new RaceState { RiderId = id, RiderKey = key };
            Update(id, key, state);
        }
        */

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private string ListId()
        {
            return (string)this.RouteData.Values.GetValueOrDefault("listid");
        }
    }
}
