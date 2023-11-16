using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Backend.Controllers;

[ApiController]
[Route("IA")]
public class IA : ControllerBase
{
    [HttpPost("")]
    [EnableCors("MainPolicy")]
    public async Task<string> RequestIA([FromBody] PersonData dados)
    {
        using (HttpClient httpClient = new HttpClient())
            try
            {
                string url = "http://localhost:3030/IA";

                HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, dados);

                if (response.IsSuccessStatusCode)
                {
                    string conteudo = await response.Content.ReadAsStringAsync();

                    int number = 0;

                    Regex regex = new Regex(@"\d+");
                    MatchCollection matches = regex.Matches(conteudo);

                    foreach (Match match in matches)
                        if (int.TryParse(match.Value, out int extractedNumber))
                            number = extractedNumber;

                    if (number <= 5)
                        return "you're going to have a horrible night's sleep.";

                    else if (number <= 7)
                        return "you will have a ok night's sleep.";

                    else
                        return "you will have a great night's sleep.";
                }
                else
                    return $"Erro na requisição: {response.StatusCode} - {response.ReasonPhrase}";

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu um erro: {ex.Message}");
                return "erro";
            }
    }
}
