using System;
using System.Security.Cryptography;
using System.Text;

namespace PetropolisApi.Controllers
{
    public class Hash
    {
        public static string Md5(string input)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(input);

            using (var md5 = MD5.Create())
            {
                var byteHash = md5.ComputeHash(bytes);
                var hash = BitConverter.ToString(byteHash).Replace("-", "");
                return hash.ToLower();
            }
        }
    }
}