using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRHubs.Entities
{
    public class Snake
    {
        public List<SnakeTail> SnakeTail { get; set; }
        public Snake()
        {
            SnakeTail = new List<SnakeTail>();
        }

        public Snake(int length)
        {
            SnakeTail = new List<SnakeTail>();
            for (int i = 0; i < length; i++)
            {
                SnakeTail.Add(new Entities.SnakeTail() { X = 0, Y = 0 });
            }
        }

        public List<SnakeTail> MoveToNewCoord(int xAxis, int yAxis)
        {
            var oldTail = SnakeTail.Select(s => new SnakeTail() { X = s.X, Y = s.Y }).ToList();
            var newTail = SnakeTail.Select(s => new SnakeTail() { X = s.X, Y = s.Y }).ToList();

            newTail[0].X += xAxis;
            newTail[0].Y += yAxis;
            
            for (int i = 1; i < oldTail.Count; i++)
            {
                newTail[i] = oldTail[i - 1];
            }

            SnakeTail = newTail.Select(s => new SnakeTail() { X = s.X, Y = s.Y }).ToList();
            return newTail;
        }
    }

    public class SnakeTail
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}
