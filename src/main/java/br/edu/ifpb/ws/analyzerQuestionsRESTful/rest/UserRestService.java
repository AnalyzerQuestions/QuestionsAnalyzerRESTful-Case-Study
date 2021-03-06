package br.edu.ifpb.ws.analyzerQuestionsRESTful.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifpb.ws.analyzerQuestionsRESTful.entities.Usuario;
import br.edu.ifpb.ws.analyzerQuestionsRESTful.exception.UniqueConstraintException;
import br.edu.ifpb.ws.analyzerQuestionsRESTful.repository.UserRepository;
import br.edu.ifpb.ws.analyzerQuestionsRESTful.services.UserService;

/**
 * 
 * <p>
 * <b> User Controller</b>
 * </p>
 * 
 * <pre>
 * 		&#64;see @UserController used for case study only.
 * </pre>
 * 
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 * @author <a https://github.com/JoseRafael97">Rafael Feitosa</a>
 *
 */
@RestController
public class UserRestService {

	public static final String BASE_URI = "/analyzer";

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	/**
	 * 
	 * @param user
	 * @return
	 * @throws UniqueConstraintException
	 */
	@RequestMapping(method = RequestMethod.POST, value = BASE_URI + "/user")
	public ResponseEntity<?> registerUser(@RequestBody Usuario user) throws UniqueConstraintException {

		Usuario userSaved = userService.saveUser(user);
		return new ResponseEntity<>(userSaved, HttpStatus.OK);

	}

	/**
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(method = RequestMethod.PUT, value = BASE_URI + "/user")
	public ResponseEntity<Usuario> updateUser(@RequestBody Usuario user) {
		Usuario u = userService.updateUser(user);
		return new ResponseEntity<Usuario>(u, HttpStatus.OK);

	}

	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, value = BASE_URI + "/user/{id}")
	public ResponseEntity<Usuario> getById(@PathVariable Long id) {
		Usuario user = userService.getById(id);
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/admin/user")
	public ResponseEntity<List<Usuario>> findAll() {

		List<Usuario> users = userService.getAll();

		return new ResponseEntity<List<Usuario>>(users, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/admin/user")
	public ResponseEntity<Usuario> removeAll() {
		userRepository.deleteAll();
		
		return new ResponseEntity<>(HttpStatus.OK);

	}
}
