using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Backend.Controllers;

[ApiController]
[Route("IA")]
public class IA : ControllerBase
{
    [HttpPost("")]
    [EnableCors("MainPolicy")]
    public async Task RequestIA([FromBody] PersonData dados)
    {
        using (HttpClient httpClient = new HttpClient())

        try
        {
            string url = "http://localhost:3030/IA";

            var novo = new PersonData();

            string conteudo = JsonConvert.SerializeObject(novo);

            HttpResponseMessage response = await httpClient.PostAsync(url, conteudo);

            if (response.IsSuccessStatusCode)
            {
                string conteudo = await response.Content.ReadAsStringAsync();
                Console.WriteLine(conteudo);
            }
            else
                Console.WriteLine($"Erro na requisição: {response.StatusCode} - {response.ReasonPhrase}");
               
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ocorreu um erro: {ex.Message}"); 
        }
    }
}
