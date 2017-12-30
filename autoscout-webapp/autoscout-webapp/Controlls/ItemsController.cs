using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Features;
using Autoscout.Hubs;
using Autoscout.Domain.Models;
using Autoscout.Domain.Commands;
using System.Collections.Concurrent;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace Autoscout.Controllers
{
    [Route("api/[controller]")]
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

        [HttpPost]
        public AddItemCommand Post([FromBody] AddItemCommand data)
        {
            _hubContext.Clients.All.InvokeAsync("ItemAccepted", data.Title, data.List);
            _hubContext.Clients.All.InvokeAsync("ItemAdded", data.Title, data.List);

            return data;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            
        }
    }
}
