import { Router } from "express";
import cheerio from "cheerio";
import FormData from "form-data";
import axios from "axios";
import https from "https";

const balance = Router();
export default balance;

interface BalanceParseResult {
    error?: string;
    data: {
        balance: number;
        dolg: number;
        penia: number;
        date: string;
        personStatus: string;
        personName: string;
    }
}


balance.get('/:balanceNumber', async (req, res) => {
    const { balanceNumber } = req.params;

    const httpsAgent =  new https.Agent({
        rejectUnauthorized: false,
    });

    const form = new FormData();
	form.append('login', balanceNumber);
	form.append('password', balanceNumber);

    const result = await axios.post(
		'https://student.mitso.by/login_stud.php',
		form,
		{ httpsAgent, headers: form.getHeaders() }
    )
    .then(response => getBalanceFromHtml(response.data))
    .catch(err => getBalanceFromHtml(err, true));

    res.status(result.error ? 500 : 200).send(result);
});

function getBalanceFromHtml(html: string, isError = false): BalanceParseResult {
    const result: BalanceParseResult = {
		data: {
            balance: null,
            dolg: null,
            penia: null,
            date: null,
            personStatus: null,
            personName: null
		},
        error: null
	};

    if (isError) {
		result.error = 'Не удалось отправить запрос на сайт МИТСО.';
		return result;
	}

	try {
		const $ = cheerio.load(html);

		// Проверка правильности ввода лицевого счета
		if ($('#container').length === 0) {
			result.error = 'Не удалось получить данные о балансе.';
			$('p').each(function () {
				if ( $( this ).text().match(/Ошибка входа/) ) {
					result.error = 'Ошибка входа. Попробуйте изменить номер лицевого счета.'
				}
			})
			return result;
		}

        let s = $('#what_section b');
		if (s) result.data.date = norm(s.text());
		s = $('#topsection #title');
		if (s) result.data.personStatus = s.text();
		s = $('#topsection .topmenu');
		if (s) result.data.personName = norm(s.text());

		s = $('#middle_section .content_text table td:nth-child(2)');
		if (s) {
			for (let i = 0; i < 3; i++) {
				if (s.eq(i).text()) {
					switch(i) {
						case 0:
							result.data.balance = +s.eq(0).text();
							break;
						case 1:
							result.data.dolg = +s.eq(1).text();
							break;
						case 2:
							result.data.penia = +s.eq(2).text();
							break;
					}
				}
			}
		}
	} catch (e) {
		result.error = 'Не удалось обработать запрос и получить данные о балансе.';
	}

	return result;

    function norm(str) {
		return str.replace(/\n/g, ' ').replace(/\t/g, '').trim();
	}
}