using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRHubs.Hubs
{
    public class ChatHub : Hub
    {
        private static Dictionary<string, string> _users = new Dictionary<string, string>();

        public override Task OnConnectedAsync()
        {
            _users.Add(Context.ConnectionId, "");
            return base.OnConnectedAsync();
        }

        public async Task LogInAs(string username)
        {
            if (_users.ContainsKey(Context.ConnectionId))
            {
                _users[Context.ConnectionId] = username;
            }
            await UpdateOnlineUsers();
        }

        public async Task SendMessageTo(string SenderUsername, string DestUserName, string message)
        {
            if (_users.ContainsValue(DestUserName))
            {
                await Clients.Client(_users.First(u => u.Value == DestUserName).Key).SendAsync("MessageReceivedFrom", SenderUsername, message);
            }
        }
        
        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_users.ContainsKey(Context.ConnectionId))
            {
                _users.Remove(Context.ConnectionId);
                UpdateOnlineUsers();
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task UpdateOnlineUsers()
        {
            await Clients.All.SendAsync("UpdateUsersList", _users.Values.ToArray());
        }
    }
}
