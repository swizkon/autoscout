namespace Autoscout.Hubs
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Configuration;

    public class ListMessageHub : Hub
    {
        public Task Send(string message)
        {
            return Clients.All.InvokeAsync("Send", message);
        }

        public Task ItemAdded(string title, string list)
        {
            return Clients.All.InvokeAsync("ItemAdded", title, list);
        }
        
        public Task ItemAccepted(string title, string list)
        {
            return Clients.All.InvokeAsync("ItemAccepted", title, list);
        }

        public void JoinList(string listId)
        {
            this.Groups.AddAsync(this.Context.ConnectionId, listId);
        }

        public Task LeaveList(string listId)
        {
            return Groups.RemoveAsync(Context.ConnectionId, listId);
        }
    }
}