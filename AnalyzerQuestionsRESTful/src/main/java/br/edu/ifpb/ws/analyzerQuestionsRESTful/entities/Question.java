package br.edu.ifpb.ws.analyzerQuestionsRESTful.entities;

import java.io.Serializable;

/**
 * 
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 *
 */
public class Question implements Serializable {

	private static final long serialVersionUID = 1L;

	private String title;
	private String description;

	public Question() {
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Question [title=" + title + ", description=" + description + "]";
	}

}