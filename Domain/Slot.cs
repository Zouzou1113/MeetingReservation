using System;
using System.Collections.Generic;
using System.Text;
using Value;

namespace Domain
{
    public class Slot: ValueType<Slot>
    {
        public string Name { get; set; }
        public int Hour { get; }
        public bool IsAvailable => Name == string.Empty;

        public Slot(string name, int hour = -1)
        {
            Name = name;
            Hour = hour;
        }

        protected override IEnumerable<object> GetAllAttributesToBeUsedForEquality()
        {
            return new object[] { Name, Hour };
        }
    }
}
