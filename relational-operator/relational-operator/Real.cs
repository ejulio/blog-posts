using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace relational_operator
{
    public class Real : IComparable<Real>
    {
        public decimal Valor { get; set; }

        public int CompareTo(Real other)
        {
            if (Valor > other.Valor)
                return 1;
            else if (Valor < other.Valor)
                return -1;

            return 0;
        }

        public static bool operator >(Real lhs, Real rhs)
        {
            return lhs.CompareTo(rhs) == 1;
        }

        public static bool operator <(Real lhs, Real rhs)
        {
            return lhs.CompareTo(rhs) == -1;
        }

        public override bool Equals(object obj)
        {
            Real real = obj as Real;
            return Valor == real.Valor;
        }

        public static bool operator ==(Real lhs, Real rhs)
        {
            return lhs.Equals(rhs);
        }

        public static bool operator !=(Real lhs, Real rhs)
        {
            return !lhs.Equals(rhs);
        }
    }
}
