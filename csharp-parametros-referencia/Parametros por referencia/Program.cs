using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parametros_por_referencia
{
    // classe para os exemplos
    class Pessoa { public string Nome { get; set; } }

    class Program
    {
        #region Reference-Type x Reference Param
            
        // Este método irá alterar o valor da variável original, atribuindo-a o valor null
        // Pessoa é um tipo por referência sendo passado por referência
        static void AlterarReferenciaPessoa(ref Pessoa p)
        {
            p.Nome = "João";
            p = null;
        }
            
        // Este método apenas irá alterar o valor da propriedade nome da variável p
        // Pessoa é um tipo por referência 
        static void AlterarPessoa(Pessoa p)
        {
            p.Nome = "José";
            p = null;
        }
            
        // Este método irá alterar apenas o valor da variável local
        // int é um tipo comum (cópia)
        static void IncrementarValor(int v)
        {
            v += 2;
        }
            
        // Este método irá alterar o valor da variável que chamou o método
        // int é um tipo comum (cópia) sendo passado por referência
        static void IncrementarValorRef(ref int v)
        {
            v += 2;
        }

        static void ExibirMensagens()
        {
            Pessoa pessoa = new Pessoa();
            pessoa.Nome = "Marcos";

            Pessoa pessoa2 = new Pessoa();
            pessoa2.Nome = "Marcos Jr.";

            AlterarPessoa(pessoa);
            AlterarReferenciaPessoa(ref pessoa2);

            if (pessoa != null)
                Console.WriteLine("O nome é: " + pessoa.Nome); // exibe
            else
                Console.WriteLine("A pessoa não existe!"); // não exibe


            if (pessoa2 != null)
                Console.WriteLine("O nome é: " + pessoa2.Nome); // não exibe
            else
                Console.WriteLine("A pessoa2 não existe!"); // exibe



            int v1 = 4, 
                v2 = 3;

            IncrementarValor(v1); // v1 = 4
            IncrementarValorRef(ref v2); // v2 = 5 

            Console.WriteLine("v1 é " + v1 + " e v2 é " + v2); // v1 é 4 e v2 é 5

        }

        #endregion

        #region ref & out

        // não precisa atribui um valor à variável res
        static void SomarRef(int v1, int v2, ref int res)
        {
            res = v1 + v2;
        }

        // Obrigatoriamente deve atribuir um valor à variável res
        static void SomarOut(int v1, int v2, out int res)
        {
            res = v1 + v2;
        }

        /* Este método funciona 
        static void SomarRef2(int v1, int v2, ref int res)
        {
            //res = v1 + v2;
        }
        */

        /* Este método não funciona
        static void SomarOut2(int v1, int v2, out int res)
        {
            //res = v1 + v2;
        }*/

        static void ExibirSoma()
        {
            int v1, v2, res1;
            int v3, v4, res2;

            v1 = 2;
            v2 = 5;
            v3 = 9;
            v4 = 7;

            //SomarRef(v1, v2, ref res1); não funciona, res1 não está inicializada
            //SomarOut(v1, v2, out res2); funciona, res2 não precisa estar inicializada

            res1 = 0;
            res2 = 0;

            SomarRef(v1, v2, ref res1);
            SomarOut(v3, v4, out res2);

            Console.WriteLine("res1: " + res1 + ", res2: " + res2);
        }

        #endregion

        #region Uso do .NET Framework de out

        static void ExibirStringParaInt()
        {

            string  vs1 = "10", 
                    vs2 = "ab1";
            int v1, v2;

            if (Int32.TryParse(vs1, out v1))
                Console.Write("vs1 convertido com sucesso para int: "); // exibe
            else
                Console.Write("Houve uma falha ao converter o valor de vs1. v1: "); // não exibe
            
            Console.WriteLine(v1); // 10

            if (Int32.TryParse(vs2, out v2))
                Console.Write("vs2 convertido com sucesso para int: "); // não exibe
            else
                Console.Write("Houve uma falha ao converter o valor de vs2. v2: "); // exibe

            Console.WriteLine(v2); // 0
        }

        #endregion

        static void Main(string[] args)
        {

            Console.WriteLine("reference-type x reference param");
            ExibirMensagens();

            Console.WriteLine("ref & out");
            ExibirSoma();

            Console.WriteLine("uso do .NET Framework de out");
            ExibirStringParaInt();

            Console.ReadKey();
        }
    }
}
