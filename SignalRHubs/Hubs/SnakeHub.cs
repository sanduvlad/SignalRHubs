using Microsoft.AspNetCore.SignalR;
using SignalRHubs.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRHubs.Hubs
{
    public class SnakeHub : Hub
    {
        private static Dictionary<string, Snake> snakes = new Dictionary<string, Snake>();

        public override Task OnConnectedAsync()
        {
            snakes.Add(Context.ConnectionId, new Snake(new Random().Next(5, 20)));
            UpdateSnakesOnClients();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            snakes.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task Move(int xAxis, int yAxis)
        {
            snakes[Context.ConnectionId].MoveToNewCoord(xAxis, yAxis);

            await UpdateSnakesOnClients();
        }

        private async Task UpdateSnakesOnClients()
        {
            await Clients.All.SendAsync("UpdateSnakesPosition", snakes.Values.ToArray());
        }
    }
}
